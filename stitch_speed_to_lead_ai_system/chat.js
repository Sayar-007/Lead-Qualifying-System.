const API_URL = "http://localhost:8000";

let leadId = null;
let isChatOpen = false;
let isWaiting = false;

document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        const nav = document.getElementById('main-nav');
        if (window.scrollY > 50) {
            nav.classList.add('nav-scrolled');
            nav.classList.remove('bg-transparent');
        } else {
            nav.classList.remove('nav-scrolled');
            nav.classList.add('bg-transparent');
        }
    });

    const chatToggle = document.getElementById('chat-toggle');
    const chatPanel = document.getElementById('chat-panel');
    const closeChat = document.getElementById('close-chat');
    
    function toggleChat() {
        isChatOpen = !isChatOpen;
        if (isChatOpen) {
            chatPanel.classList.remove('hidden');
            setTimeout(() => {
                chatPanel.classList.remove('opacity-0', 'scale-95');
                chatPanel.classList.add('opacity-100', 'scale-100');
            }, 10);
            if (chatToggle) {
                chatToggle.innerHTML = '<span class="material-symbols-outlined" style="font-size: 28px;">expand_more</span>';
            }
        } else {
            chatPanel.classList.remove('opacity-100', 'scale-100');
            chatPanel.classList.add('opacity-0', 'scale-95');
            setTimeout(() => {
                chatPanel.classList.add('hidden');
            }, 300);
            if (chatToggle) {
                chatToggle.innerHTML = '<span class="material-symbols-outlined" style="font-size: 28px;">chat_bubble</span>';
            }
        }
    }

    if (chatToggle) chatToggle.addEventListener('click', toggleChat);
    if (closeChat) closeChat.addEventListener('click', toggleChat);

    // Chat API Logic
    const chatInput = document.getElementById('chat-input');
    const chatSendBtn = document.getElementById('chat-send');
    const chatMessages = document.getElementById('chat-messages');

    function addMessage(role, text) {
        const div = document.createElement('div');
        div.className = "flex flex-col items-start";
        
        if (role === 'lead') {
            div.className = "flex flex-col items-end self-end max-w-[85%] ml-auto";
            div.innerHTML = `
                <div class="bg-primary text-white py-2 px-3 rounded-lg rounded-tr-none shadow-sm text-sm mb-4">
                    ${text}
                </div>
            `;
        } else {
            div.className = "flex flex-col items-start max-w-[85%] mb-4";
            div.innerHTML = `
                <div class="bg-surface-container py-2 px-3 rounded-lg rounded-tl-none border border-surface-variant shadow-sm text-sm">
                    ${text}
                </div>
            `;
        }
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    async function handleSend() {
        const text = chatInput.value.trim();
        if (!text || isWaiting) return;

        chatInput.value = '';
        addMessage('lead', text);
        isWaiting = true;
        chatSendBtn.disabled = true;

        try {
            if (!leadId) {
                // First message creates the lead
                const response = await fetch(`${API_URL}/webhook/lead`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: text,
                        contact: 'anonymous',
                        source: 'web_form',
                        initial_message: text
                    })
                });
                const data = await response.json();
                if (data.lead_id) {
                    leadId = data.lead_id;
                }
            }

            if (leadId) {
                const response = await fetch(`${API_URL}/chat/${leadId}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: text })
                });
                const data = await response.json();
                if (data.reply) {
                    addMessage('agent', data.reply);
                } else {
                    addMessage('agent', "I'm sorry, I encountered an error. Please try again.");
                }
            }
        } catch (error) {
            console.error(error);
            addMessage('agent', "Sorry, I'm having trouble connecting right now.");
        } finally {
            isWaiting = false;
            chatSendBtn.disabled = false;
        }
    }

    if (chatSendBtn) {
        chatSendBtn.addEventListener('click', handleSend);
    }

    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleSend();
            }
        });
    }
});
