
import SearchFood from "@/components/screen_2/SearchFood";
import { useEffect } from "react";

export default function SearchPage() {
    // const router = useRouter();
    // const { date } = router.query;

    // // Ensure the page re-renders when the date changes
    // useEffect(() => {
    //     if (!date) return;
    // }, [date]);

    // // Prevent rendering before the date is available
    // if (!date) {
    //     return null; // Or a loading spinner
    // }

    return <>
        <SearchFood />
    </>;
}
