package Array;

public class Maxnumber {

    public static void main(String [] args){

        int [] arr = { 4 , 3, 8 , 7 , 2 , 9 , 6 };

        // initialising first element of array to max
        int max = arr[0];

        for( int i = 0; i < arr.length; i++){

            // comparing
            if(arr[i] > max){
                max = arr[i];
            }
        }
        System.out.println("Largest Number : " + max);
    }
}
