import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn} from "typeorm";
import User from "./User";


enum FOLLOW_TYPE {
    FRIEND = "friend",
    BLOCK = "blocked",
    FOLLOW = "follow",
    PENDING = "pending",
    DENIED = "denied"
}

enum NOTIFICATION_TYPE {
    FAVORITE = "favorite",
    SILENCE = "silence",
    STANDARD = "standard"
}

@Entity()
export class FriendOfUser extends BaseEntity  {
    //Atributes

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    followType: FOLLOW_TYPE;

    @Column()
    notificationType: NOTIFICATION_TYPE;

    // Relationships

    @ManyToOne(() => User, (followed) => followed.friends)
    @JoinColumn({ name: "user_id" })
    public user: User

    @ManyToOne(() => User, (followed) => followed.follows)
    @JoinColumn({ name: "follower_id" })
    public follower: User
}