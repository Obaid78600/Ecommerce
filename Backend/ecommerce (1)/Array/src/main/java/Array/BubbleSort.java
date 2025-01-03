package Array;

public class BubbleSort {

    public static void main(String[] args){

        int [] arr =  { 4 , 3 , 8 , 7 , 2 , 9 , 1 , 6 };
        ekSort(arr);
    }
    private static void ekSort(int[] arr) {

        for( int i = 0; i < arr.length; i++){
            for( int a = 0; a < arr.length - 1; a++){
                if( arr[a] > arr[a+1]){
                    int vada = arr[a];
                    arr[a] = arr[a+1];
                    arr[a+1] = vada;
                }
            } // inner loop ends here

            for( int ele : arr) System.out.print(ele+" ");
            System.out.println();
        }
    }
}
