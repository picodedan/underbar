(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    return n === undefined ? array[array.length-1] : n > array.length ? array : array.slice(array.length-n,array.length);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for (var u = 0 ; u< collection.length ; u++) {
        var key = u;
        var value = collection[u];
        iterator(value,key,collection);
      }
    } else {
        for (var i = 0 ; i< Object.keys(collection).length ; i++) {
          var key = Object.keys(collection)[i];
          var value = collection[key];
          iterator(value,key,collection);
        }
      }
    }
  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;
    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });
    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var result = [];
    _.each(collection, function(item) {
      if (test(item)) {
        result.push(item);
      }
    })
    return result;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    var result = [];
    _.each(collection, function(item) {
      if (test(item) === false) {
        result.push(item);
      }
    })
    return result;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var result =[];
    _.each(array, function(elem) {
      if (_.indexOf(result,elem) === -1) {
        result.push(elem);
      }
    })
    return result;
  }; 
  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var result = [];
    _.each(collection, function(value,index) {
      result.push(iterator(value,index));
    })
    return result;
  };

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
    var result = accumulator;
    _.each(collection, function(item) {
      result === undefined ? (result = item, iterator(item)) : result = iterator(result,item);

    });
    return result;
  };


  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    var result = true;
    // TIP: Try re-using reduce() here.
    // returns true only if EVERY element in the collection evaluated by iterator is true.  if any element returns false from the iterator,  i
    //immediately return false. 
    // on itteration first loop checks if itterator equals accumulator defiualt value,  if true,  continue to next itteration,  if not tru set 
    //set accumulator to false and return.  
    if (iterator === undefined) {
      iterator = _.identity;
    }
    _.each(collection, function(item) {
      if(result === false) {
        return;
      } else if (typeof iterator(item) ==='boolean') {
        result = iterator(item);
      } else {
        result = Boolean(iterator(item));
      }
    })
    return result;
  };

  /*
  alternate deployment ^,  
  itterate through collection,  
    at each element  check if result is false
    if false do not continue to loop,  return result
    if true apply supplied iterator function,  
      check return of iterator function, 
        if not a boolean, 
          compare return of iterator function to item item yielding a boolean
          return the boolean to result
        if boolean return to result
  */

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    // output is boolean
    //input will be collection(array/object) and truth tester
    // if any element of the collection passes truth tester function will return true.  if no element passes return false
    // if no iterator is provided, supply  default
    // variation of every, but reversed. 
    var result = false;
    if (iterator === undefined) {
      iterator = _.identity;
    }

    _.each(collection, function(elem) {
      if(result === true) {
        return;
      } else if(typeof iterator(elem) === 'boolean') {
        result = iterator(elem);
      } else {
        result = Boolean(iterator(elem));  
      };
    });
    return result;
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
    for(var i = 0 ; i<arguments.length ; i++) {
      _.each(arguments[i], function(value,key) {
      obj[key] = value;
        });
    }
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
  // inputs,  source object, and undefined number of additional arguments that will contain parameters to add to the source object. 
  // output cource object with any porperties that were MISSING added to it. no over writing of keys of values that already exist in source object.
  // reduce will be really sweet here,  not comfortable yet to implement it with that YET. 
  //since source object will be considered first in the arguments 'array' for loop should start at 1
  // add checks to skip any parameters that exist. 
  var argArray = arguments;
  for(var i=1 ; i<argArray.length ; i+=1) {
    _.each(argArray[i], function(value,key) {
      if(obj[key] === undefined) {
        obj[key] = value;
      }
    });
  }
  return obj;
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
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    //input a function
    //output results of that function
    // intent is to store the results of a given function for later recal without having to run that function in it's entirety.
    // interesting note about the alternate name,  potetially store all the arguments within the closure scope, as an instance of once?   
    //create closure scope variable(s) to store argument values and results

    //create running scope function to return either memoized results or first time results
    // withing running scope,  check if arguments of function have been processed before
    //if so recall those results and return them.
    //else compute the result of the function with it's argurments
    //store the arguments and results for later recall
    //return the stored results of current
          var memoized = {}; //will create an array or arrays whose values represent the indexable values of previous arguments passed in
     //creats and array of results from previously passed in functions
    //var currentArgs = arguments  //needs to be the arguments of the argument which doens't seem possible,  re evaluating plan


    return function() {
     // var currentArgs = [];
     // _.each(arguments,function(value) {currentArgs.push(value);});
      //if statement needs to be able to evaluate equality between previous args stored as arrays and the current arg stored as an array.
      // if some element of memoizedargs has the exact same value(s) as currentarg return true      
      var args = ''
      if(arguments.length >1) {
        _.each(arguments, function(value) {args += ' ' +value});
      } else {
        args = arguments[0];
      }
      if(args in memoized) {
        return memoized[args];
      } else {
        memoized[args] = func.apply(this,arguments);
        return memoized[args]
      }
    }

  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {

    //takes as input a function as first arg,  wait time in ms as second arg,
    //and unspecified number of additional args that should be passed to the function as params
    //output is the result of the function called after the spcified wait time.  

    //capture additional items in arg array to pass on to function.
    var params = [];
    //argumentsat index 2+
    _.each(arguments,function(value,key) {
      if (key >= 2) {
        params.push(value);
      };
    });
    //wait function implementation
    setTimeout(function() {
      return func.apply(this,params);
    },wait);
    //var delayedFunc = func(params); 
    
    // call/return func(params)
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    //input an array, seriously that's it... 
    // output,  the challenging part,  a new array, containing all the elements of the source,  but in a random order!
    // .slice() will do the trick of pulling out any elements... though we will have to account for which specific elements we have pulled out
    //and what's left to SLICE out..
    // I think the Funnest way to pull this off would be variation on the switch style function,  but using math.Random to choose between
    //if/else statements that specify either pop or unshift on the copy, pushing those values to a new new array
    var startArray = array.slice();
    var shuffled = [];
    var ranNum = function() {
      return Math.floor(Math.random()*10); 
      };
    while (shuffled.length !== array.length) {

      if(ranNum() > 5) {
        shuffled.push(startArray.pop());
      } else {
        shuffled.push(startArray.shift());
      }
    };
    return shuffled;


    }


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
  };

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

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());
