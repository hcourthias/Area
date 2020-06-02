// importing observables and decorate
import { action, decorate, observable } from "mobx";
import { API_URL, getIdToken } from "../api/Services";

class Store {
  action = null;

  reaction = null;

  subscribe = [];

  apiUrl = "https://area.cap.famille4.com";

  setAction = data => {
    this.action = data;
  };

  setReaction = data => {
    this.reaction = data;
  };

  setApiUrl = data => {
    this.apiUrl = data;
  };

  setSubscribe = data => {
    this.subscribe = data;
  };

  deleteSubscribe = id => {
    const itemToRemove = this.subscribe.find(i => i.id === id);
    this.subscribe.remove(itemToRemove);
  };
}

// another way to decorate variables with observable
decorate(Store, {
  apiUrl: observable,
  action: observable,
  reaction: observable,
  subscribe: observable,
  setAction: action,
  setReaction: action,
  setSubscribe: action,
  deleteSubscribe: action,
  setApiUrl: action
});

// export class
export default new Store();
