import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    OneToOne,
} from 'typeorm';
import { User } from './user.entity';

@Entity('profiles')
export class Profile {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'user_id', type: 'uuid', unique: true })
    userId: string;

    @OneToOne(() => User, (user) => user.profile, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({ unique: true, nullable: false })
    alias: string;

    @Column({ name: 'onboarding_completed', default: false })
    onboardingCompleted: boolean;

    @Column({ name: 'selected_conditions', type: 'text', array: true, default: [] })
    selectedConditions: string[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
