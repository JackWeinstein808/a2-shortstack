Jack Weinstein
Site: https://a2-jackweinstein.glitch.me/
FOOD DELIVERY LOG
Over the summer I worked Doordash and Uber eats and logged my work in an excel sheet. I decided it would be fun to make my own system to log that data.

Technical Achievements
Tech Achievement 1: Create a single-page app that both provides a form for users to submit data and always shows the current state of the server-side data.
    This was the easy part as I could submit data to the server using a POST request. To maintain conccurrency on the client side, I created a function fetchItem that uses a GET request to get all of the data from the server to be displayed on the site.

Tech Achievement 2 : In addition to a form enabling adding and deleting data on the server, also add the ability to modify existing data.
    This was much more challenging. This functionalilty works with up to 2 entries stored. Unfortunatly I ran out of time before solving the issue with the edit and delete buttons not properly corresponding with the correct rows when there are 3 or more entries. The problem lies with how the IDs are handled. I will continue to try to fix after the submission deadline.

Tech Achievement 3 : Make 5 calcuations server side and display in number format: 00.00
    Initially I ran into some issues with only getting a whole number back or getting NaN back for some calculations. I was using parseInt instead of parseFloat which fixed the issue. I also learned to used .toFixed(2) to show only 2 places after the decimal.

=============================================================================
Design/Evaluation Achievements
Design Achievement 1: User Testing
    Here are the tasks I came up with:
    Context: You are working for DoorDash/UberEats and want to log your delivery stats.
    Task: 
    Add an entry with the following stats:
    Service: Dash
    Date: today’s date
    Wages: $23.75
    Tips: $32.59
    Miles: 30.6
    Time: 137 minutes
    MPG: 27
    Gas Price: $4.74

    Read the calculated data the site displays in the green cells. Does it match the following expected values?
    Total: $56.34
    Gas Used: 1.13 gal
    Gas Cost: $5.36
    Income: $50.98
    Hourly Pay: $22.33

    You realized you put the wrong time in, edit the entry to the correct time of 127 minutes. Does it show the correct new hourly pay of $24.09?

    Feedback: 
    
    1. Last name: Caissie
    2. no problems with functionaility. 1 issue: 
    "Just went through tasks. Didn't have any issue with understanding the app. Pretty solid layout. Only thing that was unexpected was modifying data. I expected the current field to be modified or a modified tag to be placed near it to signify it was modified."
    3. This 1 issue was not surprising as this was a goal myself to add in the future. 
    4. I want the editing fields to be in the table and clear, but it was a little too complex for just 1 week.

    1. Last name: Medina
    2. site froze after editing and deleting an entry
    "I think everything was clear and easy to use. My only comment is to increase the contrast of the edit text labels.
    I did have a problem (not sure how to recreate it, i think its how i describe it) where if i went to edit an entry, and then delete an entry, the site kind of froze. I couldnt save changes or clear entries until i reloaded the site ( but I dont think this matters towards getting points on the A2 assignment)"
    3. this issue is surprissing and I will be attempting to re-create it and find the problem. I did not experience any freezing when running locally.
    4. yes I plan on making the whole edit form more visually appealing, easier to see and use

Design Achievement 2 : Display the data in a table that grows in size with each entry, have the derived data be in different colored cells
    I used a table in html and in my javascript code added a new row each time an entry was added. I also added an if statement to assign cell colors to the derived fields.

Design Achievement 3 : Create a form to edit a row and remove the form when finished.
    To do this, in my JS code I create a div that can be added and removed when edditing data. There is a global variable that idicates if this form is present or not, which makes sure that multiple edit forms can't be added at the same time.