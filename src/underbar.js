/*jshint eqnull:true, expr:true*/

var _ = { };

(function() {

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
	  if(n > 0) return array.slice(0, n);
	  else if(n === 0) return [];
	  else return array.shift();
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
	  if(n === 0) return [];
	  else if(n > 0 && n <= array.length) return array.slice(array.length-n, array.length);
	  else if(n > array.length) return array;
	  else return array.pop();
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  _.each = function(collection, iterator) {
      if(collection instanceof Array) {
		  var retArr = [];
		  for(var i=0; i < collection.length; i++) {
			  retArr.push(iterator(collection[i],i,collection));
		  }
          return retArr;
	  }
	  else {
		  var retArr = [];
		  for(var i in collection) {
			  retArr.push(iterator(collection[i],i,collection));
		  }
		  return retArr;
	  }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var index = 0;
    var found = -1;
    _.each(array,function(a) {
        if(a === target && found ===-1) {
            found = index;
        }
        index++;
    });
    return found;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, iterator) {
	  var retArr=[];
	  _.each(collection, function(a) {
		  if(iterator(a)) retArr.push(a);
	  });
	  return retArr;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, iterator) {
    // TIP: see if you can re-use _.select() here, without simply
    // copying code in and modifying it
	var retArr=[];
	var trueArr = _.filter(collection, iterator);
	_.each(collection, function(a) {
		if(_.indexOf(trueArr,a)===-1) retArr.push(a);
	});
	return retArr;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
	  var retArr = [];	 
	  _.each(array, function(a) {
	      if(_.indexOf(retArr, a)===-1) {
	          retArr.push(a);
		  }
	  });
	  return retArr;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(array, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    return _.each(array, iterator);
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(array, propertyName) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(array, function(value){
      return value[propertyName];
    });
  };

  // Calls the method named by methodName on each value in the list.
  _.invoke = function(list, methodName, args) {
	  var retArr=[];
	  if(typeof methodName === 'string' || methodName instanceof String) {
		  _.each(list, function(a) {
			  retArr.push(a[methodName](args));
		  });
	  }
	  else {	  
		  _.each(list, function(a) {
			  retArr.push(methodName.apply(a, args));
		  });
	  }
	  return retArr;
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. Defaults to 0.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  _.reduce = function(collection, iterator, initialValue) {
	  var sum=0;
	  if(initialValue !== undefined) sum = initialValue;
	  _.each(collection, function(a) {
		  sum = iterator(sum, a);
	  });
	  return sum;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if(wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
	  return _.reduce(collection, function(a,b) {
		  if(Boolean(!a)) {
			  return false;
		  }
		  if(iterator !== undefined) return Boolean(iterator(b));
		  else return b;
	  }, true);

  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    return !_.every(collection, function(b) {
		if(iterator === undefined) return !b;
		else if(!iterator(b)) return true;
  });  
};


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
      var retObj = {};
      _.each(arguments, function(a) {
  		  for(var prop in a) {
  			  retObj[prop]=a[prop];
  		  }
	  });
      return retObj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
      var retObj = {};
      _.each(arguments, function(a) {
  		  for(var prop in a) {
			  if(!retObj.hasOwnProperty(prop)) {
				  retObj[prop]=a[prop];
			  }
  		  }
	  });
      return retObj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;
    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function(){
      if(!alreadyCalled){
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // Memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
	  var resultsObj = [];
	  var result;
	  return function(prim) {
		  if(resultsObj.hasOwnProperty(prim)) {
			  result = resultsArr[prim];
		  }
		  else {
			  result = func.call(this, prim);
			  resultsObj[prim] = result;
		  }
		  return result;
	  };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
      var args = [];
      for(var p in arguments) {
          args.push(arguments[p]);
      }
      args = args.slice(2);
	  setTimeout(function() {
		  return func.apply(this, args);
	  }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Shuffle an array.
  _.shuffle = function(array) {
	  var retArr = [];
	  while(array.length > 0) {
		  var randIndex = Math.floor(Math.random()*array.length);
		  retArr.push(array[randIndex]);
		  array.splice(randIndex,1);
	  }
	  return retArr;
  };


  /**
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */


  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };


  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Return an object that responds to chainable function calls for map, pluck,
  // select, etc.
  //
  // See the Underbar readme for details.
  _.chain = function(obj) {
  };

  // EXTRA CREDIT:
  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See the Underbar readme for details.
  _.throttle = function(func, wait) {
  };

}).call(this);
