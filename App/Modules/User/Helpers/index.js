
export const getInitial = (user) => {
    if(user.profile){
        let resultName

        if(user.profile.name){
            const name = user.profile.name.split(" ")
            if( name.length > 1 ){
                resultName = name[0].charAt(0)+name[name.length-1].charAt(0)
            } else {
                resultName = name[0].charAt(0)
            }

            return resultName.toUpperCase()

        } else {

            let firstName = ""
            let lastName = ""
            if(user.profile.firstName){
                firstName = user.profile.firstName.charAt(0)
            }
            if(user.profile.lastName){
                lastName = user.profile.lastName.charAt(0)
            }

            return firstName + lastName

        }
        
    }
    return null
}

export const getFullName = (user) => {
    if(user.profile){
        if(user.profile.name){

            return user.profile.name    
        } else {

            let firstName = ""
            let lastName = ""
            if(user.profile.firstName){
                firstName = user.profile.firstName
            }
            if(user.profile.lastName){
                lastName = user.profile.lastName
            }

            return firstName + lastName
        }
    }
}