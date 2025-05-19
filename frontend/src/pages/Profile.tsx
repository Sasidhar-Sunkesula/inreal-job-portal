import ProfileForm from "../components/Profile/ProfileForm";
import ProfileView from "../components/Profile/ProfileView";

export default function Profile() {
  return (
    <div className="space-y-8">
      <ProfileForm />
      <ProfileView />
    </div>
  );
}
