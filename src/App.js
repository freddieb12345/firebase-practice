import './App.css';
import React from 'react';
import { auth, db } from './firebase/init'
import { collection, addDoc, getDocs, getDoc, doc, query, where, updateDoc, deleteDoc } from 'firebase/firestore';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { async } from '@firebase/util';

function App() {
  const [user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  async function updatePost() {
    const hardCodedId = "28DpegkukMbwORUU1y5x";
    const postRef = doc(db, "posts", hardCodedId);
    const post = await getPostById(hardCodedId)
    console.log(post)
    const newPost = {
      ... post,
      title:"Land a $600k job"
    }
    console.log(newPost)
    updateDoc(postRef, newPost)
  }

  function deletePost() {
    const hardCodedId = "28DpegkukMbwORUU1y5x";
    const postRef = doc(db, "posts", hardCodedId);
    deleteDoc(postRef)
  }

  function createPost() {
    const post = {
      title: "Finish interview section",
      description: "do frontend simplified",
      uid: user.uid,
    };
    addDoc(collection(db, "posts"), post)
  }

  async function getAllPosts() {
    const { docs } = await getDocs(collection(db, "posts"));
    const posts = docs.map(elem => ({...elem.data(), id: elem.id})) //this adds the id's onto the data that is returned from the database.
    console.log(posts)
  }

  async function getPostById(id) {
    const hardCodedId = "28DpegkukMbwORUU1y5x"
    const postRef = doc(db, "posts", hardCodedId)
    const postSnap = await getDoc(postRef)
    return postSnap.data();
  }
  
  async function getPostByUid(){
    const postCollectionRef = await query(
      collection(db, "posts"),
      where("uid", "==", user.uid)
    );
    const { docs } = await getDocs(postCollectionRef);
    console.log(docs.map(doc => doc.data()))
  }

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false)
      if (user) {
        setUser(user)
      }
    })
  }, []) //To run something when page first "mounts" pass an empty array here

  
  function register() {
    console.log('register')
    createUserWithEmailAndPassword(auth, 'email@email.com','test123')
      .then((user) => {
        console.log(user)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function login() {
    signInWithEmailAndPassword(auth, 'email@email.com','test123')
      .then((data) => {
        console.log(data.user)
        setUser(data.user)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function logout() {
    signOut(auth);
    setUser({})
  }

  return (
    <div className="App">
      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
      <button onClick={logout}>Logout</button>
      {loading ? "loading..." : user.email}
      <button onClick={createPost}>Create post</button>
      <button onClick={getAllPosts}>Get all posts</button>
      <button onClick={getPostById}>Get post by id</button>
      <button onClick={getPostByUid}>Get post by user id</button>
      <button onClick={updatePost}>Update Post</button>
      <button onClick={deletePost}>Delete Post</button>
    </div>
  );
}

export default App;
