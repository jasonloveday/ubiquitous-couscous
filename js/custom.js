/*
	Programmer: Lukasz Czerwinski
	CodeCanyon: http://codecanyon.net/user/Lukasz_Czerwinski
	 
	If this script you like, please put a comment on codecanyon.
	
*/


$(document).ready(function (){ 
  //Usage 
  $("#gallery").flickrGallery({
            //FLICKR API KEY
            Key: 'dd7e89c7f0c07a951c30b34d7a013486',
            //Secret
            Secret: 'd792124bcd9f09bb',
            //FLICKR user ID
          User: '156865819@N02',
            //Flickr PhotoSet ID
           PhotoSet: '72157697721024025'
  });
}); 
