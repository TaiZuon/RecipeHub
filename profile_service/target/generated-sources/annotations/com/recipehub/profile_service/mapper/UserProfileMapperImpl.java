package com.recipehub.profile_service.mapper;

import com.recipehub.profile_service.dto.request.ProfileCreationRequest;
import com.recipehub.profile_service.dto.response.UserProfileResponse;
import com.recipehub.profile_service.model.UserProfile;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-12-10T05:43:36+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.12 (Oracle Corporation)"
)
@Component
public class UserProfileMapperImpl implements UserProfileMapper {

    @Override
    public UserProfile toUserProfile(ProfileCreationRequest request) {
        if ( request == null ) {
            return null;
        }

        UserProfile.UserProfileBuilder userProfile = UserProfile.builder();

        userProfile.userId( request.getUserId() );
        userProfile.fullName( request.getFullName() );
        userProfile.dob( request.getDob() );
        userProfile.city( request.getCity() );

        return userProfile.build();
    }

    @Override
    public UserProfileResponse toUserProfileReponse(UserProfile entity) {
        if ( entity == null ) {
            return null;
        }

        UserProfileResponse.UserProfileResponseBuilder userProfileResponse = UserProfileResponse.builder();

        userProfileResponse.id( entity.getId() );
        userProfileResponse.userId( entity.getUserId() );
        userProfileResponse.fullName( entity.getFullName() );
        userProfileResponse.dob( entity.getDob() );
        userProfileResponse.city( entity.getCity() );

        return userProfileResponse.build();
    }
}
