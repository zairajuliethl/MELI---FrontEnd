import { useSearchParams } from "react-router-dom";
import { ResulteTemplate } from "../../components/templates/result-template/result-template";
import "./results.sass"
export const Result = () => {
    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get('search') || '';


    return (
        <div className="result">
            <ResulteTemplate  />
        </div>
    )
}