/*
 * Function to resize iframe based on content
 */
function adjustIframes() {
  var frame = $("#pp-widget-cont", window.parent.document);
  var height = jQuery("#widget").height();
  frame.height(height);
}
/*
 * Function that connects with the server that
 * serves the top 10 articles
 */
var articles;
function retrieveArticles() {
  $.getJSON("topArticles.json", function(articles) {
    // Get the DIV we will be working on
    var widgetArea = document.getElementById("widget");

    // Create containing element for widget
    var widgetContainer = document.createElement("div");
    widgetContainer.className = "widgetContainer";
    widgetArea.appendChild(widgetContainer);

    // Create the header of the widget
    var header = document.createElement("div");
    header.className = "header";
    header.innerHTML = "Newsroom: our top stories";
    widgetContainer.appendChild(header);

    // Create the list for that contains the articles
    var row = document.createElement("UI");
    row.className = "row";
    widgetContainer.appendChild(row);

    // Loop through the array of articles and populate the widget
    for (var i = 0; i < 4; i++) {
      //generate a random number between 0 and the length of the articles array
      var random = Math.floor(Math.random() * articles.length);
      //The article at this index will be selected to appear in the widget.

      var article = document.createElement("LI"); //creates an article
      article.className = "article";
      row.appendChild(article); //adds the article to the row

      var link = document.createElement("a");
      link.className = "link";
      link.setAttribute("href", articles[random].url);
      link.setAttribute("target", "_parent");
      link.setAttribute("onclick", "trackOutboundLink(this)");
      article.appendChild(link);

      //now we fill in the article with the image and title of the article
      var imageContainer = document.createElement("SPAN");
      imageContainer.className = "imageContainer";

      var img = document.createElement("img");
      img.className = "img";
      img.setAttribute("src", articles[random].imageUrl.url);
      imageContainer.appendChild(img);

      link.appendChild(imageContainer);

      var title = document.createElement("div");
      title.className = "title";
      title.innerHTML = articles[random].title;
      link.appendChild(title);

      //removes article from list, prevents same article being displayed twice
      articles.splice(random, 1);
    }
    //PressPatron label
    var ppLabel = document.createElement("div");
    ppLabel.className = "ppLabel";
    ppLabel.innerHTML = "Recommended by PressPatron";
    widgetArea.appendChild(ppLabel);

    //call resizing method once the widget is populated
    jQuery(document).ready(function() {
      adjustIframes();
    });
  });
}

$(document).ready(function() {
  retrieveArticles();
});
//recalculate height whenever the window is resized
$(document).ready(function() {
  $(window).on("resize", adjustIframes);
});
