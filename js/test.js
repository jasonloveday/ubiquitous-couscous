

store the settings in localstorage on page load 

var pageInfo = {};

    gallery ID
    gallery category name



//  When the page loads
    // get the existing IDs
    var oldAlbum = document.getElementById("flickr").attributes.data.value;
    var oldGallery = document.getElementById(oldAlbum).attributes.name.value;


    // gotta find var album

    var newGallery = localStorage.getItem("gallery")


       // refresh the gallery images with the new category
     // set the background image for the splash page
     $(".bg").removeClass(oldGallery);
     $(".bg").addClass(newGallery);
     // change the text on the splash page
     $(".border")[0].innerHTML = newGalleryName;
     // set the album ID in the html
    $('#flickr').attr('data', album);

    // clear all current images
    var oldImages = document.getElementById("flickr").querySelectorAll(".dynamicGallery");
     $(oldImages).remove();

        // set the sidebar link bold on the active gallery
            // remove highlight from old link
            var link = document.getElementById(oldAlbum);
            $(link).removeClass("active");
            // Make the current sidebar link highlighted
            var link = document.getElementById(album);
            $(link).addClass("active");

        

 

 

 // get the name from the localstorage("gallery") item
 var newGallery = document.getElementById(album).attributes.name.value;
 

 // store the page we're heading to
 localStorage.setItem("gallery", newGallery);
     
 if (newGallery == "foodAndBev") {
   var newGalleryName = "Food & Beverage";
 } else {
   var newGalleryName = newGallery;
 }

 




 // set current sidebar link to active
 

// when a link is clicked, store the values for the new gallery

function configurator(clicked) {
    var galleryInfo = {
        "oldAlbum": $(document.getElementById("flickr").attributes.data.value),
        "newGallery": $(document.getElementById(clicked.id).attributes.name.value),
    };
    

    Home Page > click on the gallery to view > gallery page opens > gallery displayed