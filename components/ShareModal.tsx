import { useSelf } from "@liveblocks/react/suspense";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "./ui/button";
import Image from "next/image";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { User } from "lucide-react";
import UserTypeSelector from "./UserTypeSelector";
import Collaborator from "./Collaborator";

const ShareModal = ({roomId,collaborators,creatorId,currentUserType} : ShareDocumentDialogProps) => {
    const user  = useSelf();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false)

    const [email, setEmail] = useState('')
    const [userType, setUserType] = useState<UserType>('viewer')

    const shareDocumentHandler = async () =>{}
  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
            <Button className="gradient-blue h-9 flex gap-1 px-2.5" disabled={currentUserType !== 'editor'}>
                <Image 
                    src="/assets/icons/share.svg"
                    width={20}
                    height={20}
                    alt="share"
                    className="min-w-3 md:size-4"
                />
                <p className="mr-1 hidden sm:block">
                    Share
                </p>
            </Button>
            
        </DialogTrigger>
        <DialogContent className="shad-dialog">
            <DialogHeader>
            <DialogTitle>Manage who can view your document</DialogTitle>
            <DialogDescription>
                Select who can view and edit your document:
            </DialogDescription>
            </DialogHeader>
            <Label htmlFor="email" className="mt-6 text-blue-100">
                Email Address
            </Label>
            <div className="flex items-center gap-3">
                <div className="flex flex-1 rounded-md bg-dark-400">
                    <Input 
                        id="email"
                        type="email"
                        placeholder="Enter email address"
                        className="share-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <UserTypeSelector 
                        userType={userType}
                        setUserType={setUserType}
                    />
                </div>
                <Button type="submit" onClick={shareDocumentHandler} className="gradient-blue flex h-full gap-5 
                px-5" disabled={loading}>
                    {loading ? 'Sending...' : 'Invite'}
                </Button>
            </div>
            <div className="my-2 space-y-2">
                <ul className="flex flex-col">
                    {collaborators.map((collaborator) => (
                        <Collaborator />
                    ))}
                </ul>
            </div>
        </DialogContent>
    </Dialog>

  )
}

export default ShareModal