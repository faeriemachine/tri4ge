function handleMarquee() {
  // Get all marquees on page
  const marquees = document.querySelectorAll(".marquee");
  
  // Loop through each marquee
  marquees.forEach((marquee) => {
    // Get the main container and clone it
    // And then add the clone to the marquee
    const container = marquee.querySelector(".marquee-items");
    let clone = container.cloneNode(true);
    marquee.appendChild(clone);
    // Finally, add the scroll class at the same time so there is no gaps in the scrolling effect
    // We also determine if the items should be scrolling right-to-left instead by default, and adjust the marquees flex direction and which animation the containers use if so
    if (marquee.dataset.direction == "right") {
      marquee.style.flexDirection = "row-reverse";
      container.classList.add("scroll-l2r");
      clone.classList.add("scroll-l2r");
    } else {
      container.classList.add("scroll-r2l");
      clone.classList.add("scroll-r2l");
    }
    
    // First we check for the new data attribute to see if pausing this marquee is allowed:
    if (marquee.dataset.pause == "true") {
      
      // If pausing is allowed, we simply add some mouse events for when the mouse
      // enters and leaves the marquee that add and remove our new 'paused' class to
      // the .marquee-items containers
      marquee.onmouseover = e => {
        container.classList.add("paused");
        clone.classList.add("paused");
      }
      marquee.onmouseout = e => {
        container.classList.remove("paused");
        clone.classList.remove("paused");
      }
    }
  });
}
handleMarquee();