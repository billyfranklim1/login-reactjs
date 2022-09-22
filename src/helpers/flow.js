
const goTo = (path, params) => { 
  window.location.replace(
    decodeURIComponent((path || '/home') + (params ? params : ""))
  );
};

export const flowService = {
  goTo
};