import os, re

files = ['index.html', 'contact.html', 'listings.html', 'about.html', 'services.html']

for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # 1. Add id="chat-messages"
    content = content.replace(
        '<div class="h-64 p-4 overflow-y-auto flex flex-col space-y-4 bg-surface-bright/50">',
        '<div class="h-64 p-4 overflow-y-auto flex flex-col space-y-4 bg-surface-bright/50" id="chat-messages">'
    )

    # 2. Add id="chat-input"
    content = content.replace(
        'placeholder="Type a message..." type="text"/>',
        'placeholder="Type a message..." type="text" id="chat-input"/>'
    )
    # Just in case some have spaces differently
    content = re.sub(
        r'placeholder="Type a message..."\s*type="text"\s*/>',
        'placeholder="Type a message..." type="text" id="chat-input"/>',
        content
    )
    content = re.sub(
        r'type="text"\s*placeholder="Type a message..."\s*/>',
        'type="text" placeholder="Type a message..." id="chat-input"/>',
        content
    )

    # 3. Add id="chat-send"
    # Find the button that wraps the send icon
    content = re.sub(
        r'(<button class="text-primary hover:text-secondary ml-2 transition-colors")>',
        r'\1 id="chat-send">',
        content
    )

    # 4. Replace the old inline script with chat.js
    content = re.sub(
        r'<script>\s*// Navbar Scroll Effect[\s\S]*?</script>',
        '<script src="chat.js"></script>',
        content
    )
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)

print("Updated HTML files for chat.js")
