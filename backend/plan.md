AirBnb App

NOTES:
how to upload photos without URL blob
slider from library

### LOG IN PAGE

- first form will log in any user. With username and password
- Default next screen will be Homepage. Or if role only has host takes to host page.
- button to go to sign up page
- button to submit
- if user doesn't exist throw error.

### Sign Up

- new form to create user
- radio input role of host or guest(default)

### Nav bar

- header with logo, switch(when logged in), (wishlist), login/account

### home page/guest page

- loggedin header with account button goes to guest dashboard
- all listings as cards
- filter search for location, guest number, date, and number of bedrooms, (not all required)

### house listing detail page

- HOST will have edit button to make changes.
- listing details, guest number and location.
- availabilty form with guests and dates on.
- Submit availabilty button - If user is not logged in model to ask to login/ sign up - If signed in, says Hooray! holiday booked. - If dates are unavailble submit button is greyed out (unless css makes days unclickable?)
- reviews
- map of house location
- host profile
- (wishlist button)

### GUEST STUFF

### Guest dashboard

- button to profile
- show all bookings
  - host username live link to host profile (could reuse booking component for host side??)
  - Future bookings. Button to cancel. - button to email host.
  - Past bookings section with review button - pop up textbox.
  - go to - house listing detail page

### guest profile

- Username
- bio
- edit button or delete entire account

### HOST STUFF

### host dashboard

- shows all bookings first half of page - guest username live link to guest profile (could reuse booking component for guest side??) - button to email guest
- shows listings (cards) second half page
- button to go to profile
- create listing button to show model pop up form.
- (aside list of reviews)

### host profile

- preview view
- edit button toggles to edit view with delete button

STRETCHES

### (wishlist goal) a guest can see all his wishlist pages

### testing

### approve booking

### A guest should be able to:

log in as a guest
log in as a host
Create guest profile

view all houses
search houses by location
search by number of rooms/guests
search by date availability
(search by type of house)

click on house listing page to see all info on house
house listing should have date/guest form
book house for certain date
click on host to see host profile, see more info on host
add house to wishlist
view reviews of other guests
see house on map

have and view own profile page
profile shows all past/future bookings
ability to add review to past bookings
ability to cancel/change booking

send email to host

### A host should be able to:

log in as a guest
log in as a host
create host profile
create listing
preview listing, edit, remove.
see all bookings (calendar)
(cancel booking)
see all own listings
email guest
(approve booking)
