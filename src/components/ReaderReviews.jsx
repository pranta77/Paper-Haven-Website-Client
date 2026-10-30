// import { Star, Quote } from "lucide-react";
// import Image from "next/image";

// const reviews = [
//   {
//     name: "Sarah Ahmed",
//     role: "Book Lover",
//     avatar: "https://i.pravatar.cc/150?img=47",
//     rating: 5,
//     review:
//       "Paper Haven makes discovering and borrowing books so easy. I love how simple and organized everything is!",
//   },
//   {
//     name: "Rahim Hasan",
//     role: "Regular Reader",
//     avatar: "https://i.pravatar.cc/150?img=12",
//     rating: 5,
//     review:
//       "A wonderful platform for book lovers. The collection is amazing, and borrowing books is a very smooth experience.",
//   },
//   {
//     name: "Nusrat Jahan",
//     role: "Student",
//     avatar: "https://i.pravatar.cc/150?img=44",
//     rating: 5,
//     review:
//       "I can easily find books and keep track of what I borrow. Paper Haven has made my reading journey much better!",
//   },
// ];

// const ReaderReviews = () => {
//   return (
//     <section className="bg-[#F7F4EA] py-20">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Section Heading */}
//         <div className="text-center mb-14">
//           <p className="text-[#B58A45] font-semibold tracking-widest text-sm uppercase">
//             Our Community
//           </p>

//           <h2 className="text-3xl md:text-4xl font-bold text-[#285943] mt-3">
//             What Our Readers Say
//           </h2>

//           <p className="text-gray-500 mt-4 max-w-xl mx-auto leading-7">
//             Discover why book lovers enjoy being part of the Paper Haven
//             community.
//           </p>
//         </div>

//         {/* Review Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
//           {reviews.map((review, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-2xl p-8 shadow-sm border border-[#E8E1D2] hover:shadow-lg transition-shadow duration-300"
//             >
//               <div className="flex justify-between items-center mb-5">
//                 <div className="flex gap-1 text-[#D6A85F]">
//                   {Array.from({ length: review.rating }).map((_, i) => (
//                     <Star key={i} size={17} fill="currentColor" />
//                   ))}
//                 </div>

//                 <Quote size={32} className="text-[#285943]/20" />
//               </div>

//               <p className="text-gray-600 text-sm leading-7 min-h-24">
//                 {review.review}
//               </p>

//               <div className="flex items-center gap-4 mt-7 pt-5 border-t border-gray-100">
//                 <Image
//                   src={review.avatar}
//                   alt={review.name}
//                   className="w-12 h-12 rounded-full object-cover"
//                   width={40}
//                   height={40}
//                 />

//                 <div>
//                   <h3 className="font-bold text-[#285943]">{review.name}</h3>

//                   <p className="text-xs text-gray-400 mt-1">{review.role}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ReaderReviews;
