// {
//   project.shared_users.map((user) => {
//     const sharedAccess = project.shared_list?.find(
//       (s) => s.user === user.user_id
//     );

//     return (
//       <div
//         key={user.id}
//         className="bg-primary/50 p-4 rounded-lg border border-tertiary/30 hover:border-tertiary/60 transition-all duration-200"
//       >
//         <div className="flex items-center justify-between gap-4">
//           <div className="flex items-center gap-3 flex-1 min-w-0">
//             <img
//               src={user.avatar || "/pngs/default-avatar.png"}
//               alt={user.fullname}
//               className="w-10 h-10 rounded-full ring-2 ring-gray-600"
//             />
//             <div className="flex-1 min-w-0">
//               <div className="flex items-center gap-2 flex-wrap">
//                 <span className="font-medium text-white truncate">
//                   {user.fullname}
//                 </span>
//                 <Badge
//                   className={`${getRoleBadgeColor(
//                     user.role
//                   )} capitalize text-xs`}
//                 >
//                   {user.role}
//                 </Badge>
//               </div>
//               <p className="text-sm text-gray-400 truncate">{user.email}</p>
//             </div>
//           </div>

//           <div className="flex flex-col items-center gap-2">
//             <Button
//               onClick={() =>
//                 setShowCollaboratorDeleteModal({
//                   isOpen: true,
//                   userId: user.user_id,
//                 })
//               }
//               disabled={removingUser === user.id}
//               variant="destructive"
//               className="hover:bg-red-600 transition-all"
//             >
//               {removingUser === user.id ? (
//                 "Removing..."
//               ) : (
//                 <>
//                   <Trash2 className="w-4 h-4 mr-1" />
//                   Remove
//                 </>
//               )}
//             </Button>
//             {/* Role Change Dropdown */}
//             <div className="mt-2">
//               <InputField
//                 field="select"
//                 label=""
//                 options={[
//                   { label: "Read", value: "read" },
//                   { label: "Write", value: "write" },
//                   { label: "Manage", value: "manage" },
//                 ]}
//                 value={user.role}
//                 disabled={changingRole === sharedAccess?.id}
//                 onChange={(e) => {
//                   const newRole = e.target.value;
//                   if (sharedAccess && newRole !== user.role) {
//                     handleChangeRole(sharedAccess.id, newRole);
//                   }
//                 }}
//                 className="my-1 py-1 text-xs sm:text-sm"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   });
// }

// {
//   project.shared_users.length === 0 && (
//     <div className="text-center py-8 text-gray-400">
//       <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
//       <p className="text-lg">No collaborators yet</p>
//       <p className="text-sm text-gray-500 mt-1">
//         Invite people to work on this project with you
//       </p>
//     </div>
//   );
// }
