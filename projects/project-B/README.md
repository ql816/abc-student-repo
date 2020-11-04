# CAR RACING ON THE INTERNET

## Description
The Internet is just like a highway. You are moving almost every moment at a high speed. Have you ever thought of playing a car race game using your browser? Here is your chance! Download this extension [here](https://github.com/ql816/abc-student-repo/raw/master/projects/project-B/Car_Racing.zip) to enjoy an exciting car race game on the web. You can drive through the Internet.
<br>
1. This extension will show you the speed you scroll the page, with a speed meter(with information about speed and time remaining) shown on the page. It is never right to speed in reality, but the Internet might be an excellent place for you to speed up!
<br>
2. For each page you visit, there will be a match. In 15 seconds, please try to scroll as fast as you can. The points you earned on each game will be dependent on the maximum speed you have reached. Try to make as many points as you can. The points will remain even if you start a new match on another page. If you want to start a new season, terminate the browser entirely, and open it again. Your score will be 0 in a new season.
<br>
3. You will need to avoid the moving obstacles (the moving links). Once your mouse is placed on the links, you will lose 2 points. The difficulty level of a match is determined by the density of links on the page. Links are hazardous sometimes!
<br>
4. At the beginning of each new match, we will check your total points earned. If the number of the points you owned is smaller than 0, then, unfortunately, you cannot take part in the match. You will need to fuel your vehicle. Try to find some links with the word “fuel” in their titles. Put your cursor on it. Your vehicle will be fueled and ready for a new game shortly. If links are used properly, they can be beneficial!
<br>

## Demo
The gif is large, please wait for it to load.
<br>
![image](demo.gif)

## Technical Explanation
We start by calculating the scrolling speed after we change the cursor icon to a car and the scrollbar to a racing track. For this part, we just needed to use the difference in scrollTop divided by the time interval. We also showed the speed with a speed meter created in the content script and converted the speed to km/h, which resembles real-life cars.<br>

Next, we implemented the obstacle part: the links. When your mouse is detected hovering on a link, you will lose some points. We encountered a little problem when we wanted to show the speed periodically. Since the change of y position happens during the event "onscroll", we showed the speed after a certain time interval using the difference in "timeStamp" inside the "onscroll" function. However, the frequency of displaying the speed is not guaranteed. After we asked the professor, we changed the method. We only update the position of y inside the "onscroll" function while calling the setInterval function to show the speed periodically.<br>

Then it came the communication part, which I found a bit difficult. If the user ends up with a negative score, he/she will need to "fuel up," meaning the mouse needs to be over some links containing the word "fuel" in it. When the user opens a new window, he/she will be alerted that only after fueling can one continue the racing. So knowing the score of the previously opened window is important. Every time a race ends in one window, the score will be sent to the background script to store it. And on opening a new window, it will automatically ask the background script for the latest score. But overall, we solved this issue quite smoothly.<br>

We're almost finished here, with all wanted features realized. Yet we wanted to make it more fun, so we let all the links move around continually, so the user needs to pay attention when he/she browses.
