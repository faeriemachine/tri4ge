    document.addEventListener("DOMContentLoaded", function() {
      var userPreference;
      if(getCookie('appearance')) {
          // Use the saved preference if there is a cookie
          userPreference = getCookie('appearance');
      } else {
          // Use system preference if there is no cookie
          userPreference = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      // Apply the user preference
      applyAppearance(userPreference);
      // Add event listener to the toggle button
      document.getElementById("toggle-button").addEventListener("click", toggleMode);
  });
  function applyAppearance(mode) {
      var imgElement = document.getElementById('toggle-img');
      if(mode === 'dark') {
          document.body.classList.add('dark');
          imgElement.src = '/img/togglemoon.png';
      } else {
          document.body.classList.remove('dark');
          imgElement.src = '/img/togglesun.png';
      }
      setCookie('appearance', mode, 30); // Expires in 30 days
  }
  function toggleMode() {
      var newMode = document.body.classList.contains('dark') ? 'light' : 'dark';
      applyAppearance(newMode);
  }
  function setCookie(name, value, days) {
      var expires = "";
      if (days) {
          var date = new Date();
          date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
          expires = "; expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + (value || "")  + expires + "; path=/";
  }
  function getCookie(name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(';');
      for(var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') c = c.substring(1,c.length);
          if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
      }
      return null;
  }