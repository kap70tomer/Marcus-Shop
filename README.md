# Marcus-Shop
E-Commerce app, is an online-shop wholesale retailer that offers direct delivery of groceries and household products in bulk.  an easy to use app that allows customers to shop wholesale products on-the-go and without paying wholesale club membership fees. App users can enjoy the convenience of bulk shopping from anywhere anytime.

## How to run the app - ** Try it yourself. **
1.  Either fork or download the app and open the directory in the cli.

2.  Install all dependencies using the 'npm i' command.
  
  
3.  Start the web server using the 'npm run' command.
    The app will be served at http://localhost:4200/ .

4.  Go to http://localhost:4200/ in your browser and enjoy.





## Apps features & How it works
~ SignUp & Login , Create a user to start using the apps services,
Login and Authantication Users System, using JSON Web Token and Crypto to Hash and secure passwords.

~ Take a cart and start shopping, 
if not finnished cart is saved and can be resumed later.
unclosed carts are displayed on home page with thier creation date.

~ Order your shippmments directly to you, 
on registration you are asked to fill your address for delivery.
wich can quikly be used in the checkout page by double clicking on the address field.

~ Search on checkout page allows you to go througth your cart products before finally closing the order.
Highlighting the text that matches in your shopping cart.

~ Filter all productes in store to categories.  
using angular pipe to transform the list of displayed products in shop.

~ 


~ Admin Can Change any resource in the shop, but not Users or Orders.
delete, add or edit any product details.


## Technologies & Tools
Built using MEAN stack - MySQL Express Angular Node.js.

MySQL,DB stores the apps data as 'single source of truth'.

Connected througth the back-end server, 
Implamented with Node.js and Exspress framework, allowing to chain middlewares, to 
build *REST api,
where sensetive data and algorithem of the app is found. Seperated from the front-end.(clients side).

client side is developed using Angular8 framework with TypeScript.
customized and styled with Matirial-UI, Bootstrap4 and CSS.
the style is intuitive and simple, and the layout is responsive,
to keep the expirience the same feel across platforms. 

REST is a software architectural style that defines the set of rules to be used for creating web services. Web services which follow the REST architectural style are known as RESTful web services. It allows requesting systems to access and manipulate web resources by using a uniform and predefined set of rules.


## Future Features to develope
- Displayed from calender, Available dates for shipping.
- Returning customers special offers & deals.
- Features of a stock control system, like inventory tracking.

## How the app looks? UI- preview.

## Home page view.

## Main Shop page.

## Admins Dashboard.
