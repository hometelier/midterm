export class ProxyEmp {
  firstName;
  lastName;

  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        if (prop === 'fullName') {
          return `${target.firstName} ${target.lastName}`;
        }

        return target[prop];
      },

      set(target, prop, value) {
        if (prop === 'fullName') {
          const [firstName, lastName] = value.split(' ');
          if (!lastName) {
            target.lastName = firstName.toUpperCase();
            return true;
          }
          target.firstName = firstName;
          target.lastName = lastName.toUpperCase();
        }

        return (target[prop] = value);
      },
    });
  }
}
