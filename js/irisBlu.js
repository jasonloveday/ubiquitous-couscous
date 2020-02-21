// on page load

// block right-click functionality
window.oncontextmenu = (e) => {
    e.preventDefault();
}

// Include other HTML files
function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            /* Make an HTTP request using the attribute value as the file name: */
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        elmnt.innerHTML = this.responseText;
                    }
                    if (this.status == 404) {
                        elmnt.innerHTML = "Page not found.";
                    }
                    /* Remove the attribute, and call this function once more: */
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /* Exit the function: */
            return;
        }
    }
};

// Set scrolled class for sidebar and footer
$(document).scroll(function () {
    var $sidebar = $("#mainSidebar");
    $sidebar.toggleClass("scrolled", $(this).scrollTop() > $sidebar.height());
    var $footer = $('#mainFooter');
    $footer.toggleClass("scrolled", $(this).scrollTop() > $sidebar.height());
});

// function to grab images from Flickr based on the album ID
// to use, add the following to the gallery on the html page:
// <div id="imageGallery" class="gallery">
// <div class="flickrAlbum" id="flickr" data="72157690044034543"></div>
// </div>

function getImages() {
    var irisBlu = {};
    var irisBlu = JSON.parse(localStorage.getItem('irisBlu')) || [];
    $(".bg").removeClass(irisBlu.oldCategory);
    $(".bg").addClass(irisBlu.newCategory);
    $(".border")[0].innerHTML = irisBlu.newGalleryName;
    var album = irisBlu.newGalleryId;
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=4bcd6e3d1a3647645b6b9150d6b01300&photoset_id=" + album + "&per_page=12&format=json&nojsoncallback=1",
        "headers": {}
    }
    $.ajax(settings).done(function (data) {
        $("#galleryTitle").append(data.photoset.photo[0].title + " Gallery");
        $.each(data.photoset.photo, function (i, gp) {

            var farmId = gp.farm;
            var serverId = gp.server;
            var id = gp.id;
            var secret = gp.secret;

            $("#flickr").append('<a class="dynamicGallery" data-fancybox="gallery" href="https://farm' + farmId + '.staticflickr.com/' + serverId + '/' + id + '_' + secret + '_b.jpg"" ><img src="https://farm' + farmId + '.staticflickr.com/' + serverId + '/' + id + '_' + secret + '.jpg"/>');

        });
    });
};

// Make the current sidebar link highlighted
// $(document).ready(function () {

//     $("[href]").each(function () {
//         if (this.href == window.location.href) {
//             $(this).addClass("active");
//         }
//     });


// });

function changeGallery() {

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

    // get the data from localStorage
    var irisBlu = JSON.parse(localStorage.getItem('irisBlu')) || [];

    // set the album ID in the html
    $('#flickr').attr('data', irisBlu.newGalleryId);

    //  set the gallery name
    $(".border")[0].innerHTML = irisBlu.newGalleryName;

    // set the bg image tag
    $(".bg").removeClass(irisBlu.oldCategory);
    $(".bg").addClass(irisBlu.newCategory);

    // set current sidebar link to active
    // remove highlight from old link
    var link = document.getElementById(irisBlu.oldGalleryId);
    $(link).removeClass("active");

    // Make the current sidebar link highlighted
    var link = document.getElementById(irisBlu.newGalleryId);
    $(link).addClass("active");

    // clear all current images
    var oldImages = document.getElementById("flickr").querySelectorAll(".dynamicGallery");
    setTimeout(function () {
        $(oldImages).remove();
    }, 1000);

    // get new images
    getImages();
}

function writeStorage(clicked) {
    // make sure the var is clear
    var irisBlu = {};
    localStorage.clear('irisBlu');

    irisBlu.newCategory = (document.getElementById(clicked.id).attributes.name.value);

    if ((document.getElementById(clicked.id).attributes.id.value).indexOf('N') > -1) {
        irisBlu.newGalleryId = (document.getElementById(clicked.id).attributes.id.value).replace('N', '');
    } else {
        irisBlu.newGalleryId = (document.getElementById(clicked.id).attributes.id.value);;
    }
    
    if (irisBlu.newCategory == "foodAndBev") {
        irisBlu.newGalleryName = "Food & Beverage";
    } else {
        irisBlu.newGalleryName = irisBlu.newCategory;
    }
    
    localStorage.setItem('irisBlu', JSON.stringify(irisBlu));
    $("[href]").each(function () {
        if (this.href == window.location.href) {
            irisBlu.oldGalleryId = (document.getElementById("flickr").attributes.data.value);
            irisBlu.oldCategory = (document.getElementById(irisBlu.oldGalleryId).attributes.name.value);
            localStorage.setItem('irisBlu', JSON.stringify(irisBlu));
            changeGallery();
        }
    });

    var irisBlu = {};
}


// getImages();
includeHTML();