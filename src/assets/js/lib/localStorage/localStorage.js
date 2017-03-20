const STORGE_KEY = 'todo-vuejs';

export default {
	  get(){
	  	   return JSON.parse(window.localStorage.getItem(STORGE_KEY) || '[]');
	  },
	  set(items){
	       window.localStorage.setItem(STORGE_KEY,JSON.stringify(items));	   
	  }
}