export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("search");

    if (!serializedState || serializedState === '""') {
      return "chennai";
    }

    return JSON.parse(serializedState);
  } catch (e) {
    return "chennai";
  }
};


export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("search", serializedState);
  } catch (e) {
    console.error("Could not save state", e);
  }
};


export const favouritesLoadState = ()=>{
  try {
    const serializedState = localStorage.getItem("favourites");
    if (!serializedState || serializedState === '""') {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return [];
  }
};

export const favouritesSaveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("favourites", serializedState);
  } catch (error) {
    console.error("Could not save favourites state", error);
  }
};
