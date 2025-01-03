package Array;

import java.util.HashMap;

public class Hash {
    public static void main(String[] args){

        HashMap<Integer , String> hm = new HashMap<>();

        hm.put(1, "Monday");
        hm.put(2, "Tuesday");
        hm.put(3, "Wednesday");
        hm.put(4, "Thursday");
        hm.put(5, "Friday");
        hm.put(6, "Saturday");
        hm.put(7, "Sunday");

        System.out.println("Size is: " +hm.size());

        System.out.println(hm);

        System.out.println(hm.containsKey(8));
        System.out.println(hm.get(7));
    }
}
