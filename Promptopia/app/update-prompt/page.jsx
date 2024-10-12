"use client";

import { Suspense ,useEffect, useState } from "react";

import { useRouter,useSearchParams } from "next/navigation";
import Form from "@components/Form";

const EditPrompt = () => {
    const router = useRouter();

    
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');

    const [submitting,setSubmitting] = useState(false);
    const [post,setPost] = useState({
        prompt: '',
        tag:'',
    });

    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`)
            const data = await response.json();

            console.log(data.prompt)

            setPost({
                prompt:data.prompt,
                tag:data.tag
            })
        }

        if(promptId) getPromptDetails();
    },[promptId])

    const updatePrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        if(!promptId) return alert('Prompt id not found')

        try{
            const response = await fetch(`/api/prompt/${promptId}`,{
                method:'PATCH',
                body:JSON.stringify({
                    prompt:post.prompt,
                    
                    tag:post.tag
                })
            })

            if(response.ok){
                router.push('/');
            }
        }catch(err){
            console.log(err);
        }finally{
            setSubmitting(false);
        }
    }

  return (
    <Suspense fallback={<div>Loading...</div>}>
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  </Suspense>
  )
}

export default EditPrompt

// "use client";

// import { Suspense, useEffect, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import Form from "@components/Form";

// // Component to fetch and manage prompt data
// const EditPromptContent = ({ promptId }) => {
//     const router = useRouter();
//     const [submitting, setSubmitting] = useState(false);
//     const [post, setPost] = useState({
//         prompt: '',
//         tag: '',
//     });

//     useEffect(() => {
//         const getPromptDetails = async () => {
//             const response = await fetch(`/api/prompt/${promptId}`);
//             const data = await response.json();

//             console.log(data.prompt);

//             setPost({
//                 prompt: data.prompt,
//                 tag: data.tag
//             });
//         };

//         if (promptId) getPromptDetails();
//     }, [promptId]);

//     const updatePrompt = async (e) => {
//         e.preventDefault();
//         setSubmitting(true);

//         if (!promptId) return alert('Prompt id not found');

//         try {
//             const response = await fetch(`/api/prompt/${promptId}`, {
//                 method: 'PATCH',
//                 body: JSON.stringify({
//                     prompt: post.prompt,
//                     tag: post.tag
//                 })
//             });

//             if (response.ok) {
//                 router.push('/');
//             }
//         } catch (err) {
//             console.log(err);
//         } finally {
//             setSubmitting(false);
//         }
//     };

//     return (
//         <Form
//             type="Edit"
//             post={post}
//             setPost={setPost}
//             submitting={submitting}
//             handleSubmit={updatePrompt}
//         />
//     );
// };

// // Main component to handle Suspense boundary
// const EditPrompt = () => {
//     const searchParams = useSearchParams();
//     const promptId = searchParams.get('id');

//     return (
//         <Suspense fallback={<div>Loading...</div>}>
//             <EditPromptContent promptId={promptId} />
//         </Suspense>
//     );
// };

// export default EditPrompt;
