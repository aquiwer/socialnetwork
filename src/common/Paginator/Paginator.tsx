import React, {useState} from "react";
import styles from '../../components/friends/styles/Friends.module.css'
import '../../generalFiles/general.css'

type PropsType = {
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    totalItemCount: number
    portionSize?: number
}
let Paginator: React.FC<PropsType> = ({pageSize, currentPage, onPageChanged, totalItemCount, portionSize = 5}) => {

    let pagesCount = Math.ceil(totalItemCount / pageSize);

    let pages: Array<number> = []

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortNumber = portionNumber * portionSize;

    return (
        <>

            <div className={styles.pagination} id={styles.pagination}>
                {portionNumber > 1 &&
                <button onClick={() => setPortionNumber(portionNumber - 1)}>
                    Prev
                </button>}
                {
                    pages.filter(page => page >= leftPortNumber && page <= rightPortNumber)
                        .map(page => {
                            return (
                                <button
                                    onClick={(e) => {
                                        onPageChanged(page)
                                    }}
                                    key={page}>{page}</button>
                            )

                        })
                }
                {
                    portionCount > portionNumber &&
                    <button onClick={() => setPortionNumber(portionNumber + 1)}>
                        next
                    </button>
                }
            </div>
        </>
    );
}
export default Paginator;