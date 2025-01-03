package Array;

import java.util.HashSet;
import java.util.Set;

public class Mutuals {
    public static void main(String[] args){
        int [] a = { 1,2,3,5,7,8,9,11 };
        int [] b = { 1,2,4,6,8,10,12,14 };

        Set<Integer> set1 = new HashSet<>();
        Set<Integer> common = new HashSet<>();
        for ( int num : a ){
            set1.add(num);
        }

        for( int num : b ){
            if (set1.contains(num)){
                common.add(num);
            }
        }
        System.out.println("Common Elements are" + common);
    }
}
