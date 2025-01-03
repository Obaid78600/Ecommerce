package Array;

public class MinNumber {
    public static void main(String [] args){

        int [] arr = { 4 , 3, 8 , 7, 2 , 9 , 6 };

        // initialising min with first element of array ( for eg - index number starts with 0 so arr[0])
        int min = arr[0];

        for( int i = 0; i < arr.length; i++){
            // comparing elements of array with min
            if(arr[i] < min){
                min = arr[i];
            }
        }
        System.out.println("Smallest Number : " + min);
    }
}
