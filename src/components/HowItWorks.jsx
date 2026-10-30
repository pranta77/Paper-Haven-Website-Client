
// import { Search, BookOpen, RotateCcw } from "lucide-react";

// const steps = [
//   {
//     icon: Search,
//     number: "01",
//     title: "Find Your Book",
//     description:
//       "Explore our book collection and discover the perfect book for your next reading adventure.",
//   },
//   {
//     icon: BookOpen,
//     number: "02",
//     title: "Borrow & Enjoy",
//     description:
//       "Choose your favorite available book and borrow it for a few days to enjoy reading.",
//   },
//   {
//     icon: RotateCcw,
//     number: "03",
//     title: "Return Your Book",
//     description:
//       "Return your borrowed book on time and make it available for another book lover.",
//   },
// ];

// const HowItWorks = () => {
//   return (
//     <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

//       {/* Section Heading */}
//       <div className="text-center mb-14">
//         <p className="text-[#D6A85F] font-semibold tracking-widest text-sm uppercase">
//           Simple & Easy
//         </p>

//         <h2 className="text-3xl md:text-4xl font-bold text-[#285943] mt-3">
//           How Borrowing Works
//         </h2>

//         <p className="text-gray-500 mt-4 max-w-xl mx-auto leading-7">
//           Getting your favorite book is easier than ever.
//           Just follow these three simple steps and start reading!
//         </p>
//       </div>

//       {/* Steps */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//         {steps.map((step) => {
//           const Icon = step.icon;

//           return (
//             <div
//               key={step.number}
//               className="bg-white rounded-2xl p-8 text-center border border-[#E8E1D2] shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-300"
//             >
//               <div className="relative inline-flex">
//                 <div className="w-20 h-20 rounded-2xl bg-[#285943] text-white flex items-center justify-center">
//                   <Icon size={34} />
//                 </div>

//                 <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#D6A85F] text-[#1F2933] text-sm font-bold flex items-center justify-center">
//                   {step.number}
//                 </span>
//               </div>

//               <h3 className="text-xl font-bold text-[#285943] mt-7 mb-3">
//                 {step.title}
//               </h3>

//               <p className="text-gray-500 text-sm leading-7">
//                 {step.description}
//               </p>
//             </div>
//           );
//         })}
//       </div>

//     </section>
//   );
// };

// export default HowItWorks;
