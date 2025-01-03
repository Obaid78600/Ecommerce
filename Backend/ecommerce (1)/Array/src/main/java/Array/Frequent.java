package Array;

import java.util.HashMap;

public class Frequent {

    public static void main(String[] args){

        int [] arr = { 1, 2, 1, 3, 2, 1 };
        System.out.println("Most Frequent Number is : "+mfoe(arr));
    }

    private static int mfoe(int[] arr){

        int maxcount = 0;
        int theElement = 0;

        HashMap<Integer , Integer> hm = new HashMap<>();

        for( int num : arr ){
            if(hm.containsKey(num)){
                hm.put(num , hm.get(num)+1);
            }else{
                hm.put(num , 1);
            }
            if(hm.get(num)>maxcount){
                maxcount = hm.get(num);
                theElement = num;
            }
        }
        return theElement;
    }
}
