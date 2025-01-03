package Array;

public class Sorting {

    public static void main(String[] args){

        int [] arr = { 4 , 3 , 8 , 7 , 2 , 9 , 1 , 6 };
        int temp = 0;

        System.out.println("Original Array : ");
        for( int i = 0; i < arr.length; i++){
            System.out.print(arr[i]+" ");
        }

        for( int i = 0; i < arr.length; i++){
            for ( int j = i+1; j < arr.length; j++){
                if ( arr[i] > arr[j]){
                    temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
                }
            }
        }
        System.out.println("Sorted Array : ");
        for ( int i = 0; i < arr.length; i++){
            System.out.print(arr[i]+" ");
        }
    }
}


