import homeReducer, {addNewPost} from "../reducers/homeReducer";
import vika from "../../assets/imgs/home/vika.jpg";

const initialState = {
    posts: [
        {
            id: 0,
            author: "Elon Musk",
            post: "My first post",
            photo: 'https://img.pngio.com/-high-quality-hamtaro-transparent-png-images-png-mix-hamtaro-transparent-200_200.png'
        },
        {
            id: 1,
            author: "Viktoria Kazantseva",
            post: "My first post",
            photo: vika
        },
        {
            id: 2,
            author: "Dmitrii Alekseenko",
            post: "My second post",
            photo: 'https://img.pngio.com/-high-quality-hamtaro-transparent-png-images-png-mix-hamtaro-transparent-200_200.png'
        },
        {
            id: 3,
            author: "Maks Kravchenko",
            post: "My third post",
            photo: 'https://img.pngio.com/-high-quality-hamtaro-transparent-png-images-png-mix-hamtaro-transparent-200_200.png'
        },
        {
            id: 4,
            author: "Elik <3",
            post: "My fourth post",
            photo: 'https://img.pngio.com/-high-quality-hamtaro-transparent-png-images-png-mix-hamtaro-transparent-200_200.png'
        }
    ],
}
it("new post", () => {
    let addpost = addNewPost("new post")
    let ns = homeReducer(initialState, addpost)

    expect(ns.posts.length).toBe(6)
    expect(ns.posts[5].post).toBe("new post")
})

