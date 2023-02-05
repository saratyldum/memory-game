# Memory game

This is a grid-based game made with JavaScript, HTML and CSS. The memory game is a simple card game where you try to find pair by flipping over two cards at a time.
The game is responsive, and can be played using both keyboard and mouse.

### Rules
- Start by flipping one card over
- If the second card you flip matches the first the card will stay flipped over
- If the second card you flip does not match, both cards will be flipped back around and you start again.
- The move counter will increase every time you get a match or not
- The game continues until you match all the cards on the board


Memory game is a game built for fun, using HTML, CSS, and JavaScript. The objective of Memory is to flip and match all the turned-down cards in as few moves as possible.

The game itself built entirely with JavaScript, so you can just drop it into your site / app into any element you like. The making of this game was inspired by this pen, but I went about it using plain JS, and making 3 different levels. Because it's all front end tech in action, it should work across all devices, tablets, etc.

The Cards
Right now, Memory's biggest game size is a 8 x 4 grid, meaning 32 cards. Therefore, users must specify 16 cards with unique id's and image paths in order for Memory to run at all three levels. If you don't specify any cards in the new instance of Memory, the default set will be used.
