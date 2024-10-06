import { db } from "@/lib/firebase"
import { getDocs, collection, getDoc, doc, query, where } from "firebase/firestore"

export const getAllProducts = async ()=>
{
    return getDocs(collection(db, 'Products')).then((snaps)=> snaps.docs.map((d)=> d.data()))
}

// export const getAllPostsWithCategory = async (categoryId)=>
//     {
//         const q = query(collection(db, 'posts'),where('categoryId','==', categoryId))
//         return await getDocs(q).then((snaps)=> snaps.docs.map((d)=> d.data()))
//     }
// export const getPosts = async (id)=>
//     {
//         return getDoc(doc(db, `posts/${id}`)).then((snaps)=> snaps.data())
//     }
// export default getAllPosts;