const MATH = {
  random: function(min, max) {

    return (Math.floor(Math.random()*((max-min)+1))+min);
  
  },
  floorTo: function(number, to) {
  
    return (Math.floor(number*to)/to);
  
  },
  roundTo: function(number, to) {
    
    return (Math.round(number*to)/to);
  
  },
  ceilTo: function(number, to) {
    
    return (Math.ceil(number*to)/to);
  
  },
  getXPercentOfY: function(x, y) {
    
    return (y*(x/100));
  
  },
  getXAsPercentOfY: function(x, y) {
    
    return ((x/y)*100);
  
  },
  truncate: function(number) {
    
    return number<0?this.ceilTo(number, 1):this.floorTo(number, 1);

  },
  factorial: function(i) {

    var 
    o = i;

    while(i>1&&i--) {
      o = (o*i);
    };

    return o;

  },
  oddsToMultiplier: function(a, b) {
  
    var
    c = (a+b),
    d = (c/b);
    
    return d;
    
  }
};

class LocalStorage {
  constructor(namespace) {

    this.namespace = namespace;

  };
  get(key) {

    var
    existing = this.fetch();

    return existing[key];

  };
  set(key, value) {

    var
    existing = this.fetch();

    existing[key] = value;

    this.commit(existing);

    return this;

  };
  remove(key) {

    var
    existing = this.fetch();

    delete existing[key];

    this.commit(existing);

    return this;

  };
  fetch() {

    return JSON.parse(localStorage.getItem(this.namespace)||"{}");

  };
  clear() {

    this.commit({});

  };
  commit(obj) {

    localStorage.setItem(this.namespace, JSON.stringify(obj));

  };
};

export const ROCK = {
  MATH,
  LocalStorage
};