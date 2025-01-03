package Array;

import java.util.ArrayList;

public class MutualFinder {


    public static void mutuals( int [] a , int [] b){

        // declaring 2 pointers
        int p1 = 0;
        int p2 = 0;
        int mutual = 0;

        // for fixed size of array use ArrayList
        ArrayList<Integer> result = new ArrayList<Integer>();

        // data structure to store common elements
        while ( p1 < a.length && p2 < b.length ){
            if( a[p1] == b[p2] ){
                result.add( a[p1] );
                p1++;
                p2++;
            } else if ( a[p1] > b[p2] ) {
                p2++;
            } else if ( a[p1] < b[p2] ) {
                p1++;
            }
        }
        for( int i = 0; i<a.length; i++){
            for( int j = 0; j<b.length; j++){
                if( a[i] == b[j] ){
                    mutual++;
                    break;
                }
            }
        }
        System.out.println("Mutual Elements are : " +mutual);
        System.out.println("Mutual Numbers are : " + result);
    }
}
