# RAINBOW PAINTING BOARD

## Description
This project is a rainbow painting board for you to draw with your friends!
<br>
Use your mouse/touch to draw!

## Demo
The gif is large, please wait for it to load.
<br>
![image](demo.gif)

## Technical Explanation
1. Create a Canvas
<br>
2. Get context2d and draw path on the canvas
<br>
3. Based on the mousemove event
<br>
4. if no mousedown event detected, the drawing process will not begin
<br>
5. Socket.io => send the path to other clients and draw on the client side
<br>
6. FadeOut -> set the opacity of the path
