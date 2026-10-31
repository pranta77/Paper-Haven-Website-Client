
// import Image from "next/image";
// import Link from "next/link";

// const AllBooksPage = async () => {
//   const res = await fetch("http://localhost:8000/all-books", {
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch books");
//   }

//   const data = await res.json();
//   console.log(data);
  
//   const books = data.books || [];
//   console.log(books);
  

//   return (
//     <main className="min-h-screen bg-[#F7F4EA] px-4 py-12">
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center mb-10">
//           <h1 className="text-3xl md:text-4xl font-bold text-[#285943]">
//             Explore All Books
//           </h1>
//           <p className="text-gray-500 mt-2">
//             Discover your next favorite book at Paper Haven.
//           </p>
//         </div>

//         {books.length === 0 ? (
//           <p className="text-gray-500 text-center py-12">
//             No books available yet.
//           </p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
//             {books.map((book) => (
//               <div
//                 key={book._id.toString()}
//                 className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden"
//               >
//                 <Image
//                   src={book.image}
//                   alt={book.title}
//                   className="w-full h-72 object-cover"
//                   width={500}
//                   height={400}
//                 />

//                 <div className="p-5">
//                   <span className="badge bg-[#285943] text-white border-none mb-3">
//                     {book.category}
//                   </span>

//                   <h2 className="text-xl font-bold text-[#285943]">
//                     {book.title}
//                   </h2>

//                   <p className="text-gray-500 mt-2">
//                     By {book.author}
//                   </p>

//                   <Link
//                     href={`/all-books/${book._id.toString()}`}
//                     className="btn w-full mt-5 bg-[#285943] hover:bg-[#1f4433] text-white border-none"
//                   >
//                     View Details
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </main>
//   );
// };

// export default AllBooksPage;
