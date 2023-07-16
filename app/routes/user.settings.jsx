const UserSettings = () => {
  return (
    <div>
      <details>
        <summary>Privacy</summary>
        <ul>
          <li>Privacy Checkup</li>
        </ul>
      </details>

      <details>
        <summary>Security</summary>
        <ul>
          <li>Password</li>
          <li>Login Alerts</li>
          <li>multi-factor authentication</li>
        </ul>
      </details>

      <details>
        <summary>General Settings</summary>
        <ul>
          <li>Display Settings</li>
          <li>
            <a href="">Edit Profile</a>
          </li>
        </ul>
      </details>
    </div>
  );
};

UserSettings.displayName = "Non-Privilaged User Settings";
export default UserSettings;
