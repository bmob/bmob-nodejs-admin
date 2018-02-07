const local = {
    save (key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    },
    fetch (key) {
      return JSON.parse(localStorage.getItem(key)) || null ;
    },
    remove(key){
      localStorage.removeItem(key);
    },
    clear(){
      localStorage.clear();
    }
  };

export default local