//Debounce reduces the no of api calls made 
//It is called using timeout
//It is reusable function and we will reuse this functionalty in many places
//It improves the performance of application drastically
//This func will check for certain amt of time that if the func was called
//and it will take the timeout and call after a certain amt of time the func
//here call func after 300ms and if func called again before 300ms then it will again wait for 300ms and then call
export const debounce = (fn,timeout=300) => {
    let timer;//we define the timer we didnt provide any value
    return (...args) => {//return arrowfunc with arg that has been provided we destructure it
        clearTimeout(timer);//we cleartimeout //if func called again before 300ms 
        //then debounce func will be recalled on every key stored
        timer=setTimeout(() => {//We will set timer
            fn.apply(this,args);//we pass fn.apply //this is higher order func 
            //wepassed this and the arguements that was passed to debounce func
            //this is provided for the lexical scope
        },timeout);
    };
};
