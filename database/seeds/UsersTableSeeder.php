<?php

use CodeShopping\Models\User;
use CodeShopping\Models\UserProfile;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \File::deleteDirectory(UserProfile::photoPath(), true);
        factory(User::class,1)->create([
            'email' => 'admin@user.com'
        ])
        ->each(function ($user){
            //$user->profile->phone_number = '+5544991295251';
            //$user->profile->save();
            Model::reguard();
            $user->updateWithProfile([
                'phone_number' => '+5544991295251',
                'photo' => $this->getAdminPhoto()
            ]);
            Model::unguard();
        });

        factory(User::class,1)->create([
            'email' => 'customer@user.com',
            'role' => User::ROLE_CUSTOMER
        ])
            ->each(function ($user){
                Model::reguard();
                $user->updateWithProfile([
                    'phone_number' => '+554499999999'
                ]);
                Model::unguard();
            });

        factory(User::class,50)->create([
            'role' => User::ROLE_CUSTOMER
        ]);
    }

    public function getAdminPhoto(){
        return new \Illuminate\Http\UploadedFile(
            storage_path('app/faker/users/photos/cs-profile-picture-2.jpg'),
            str_random(16).'.jpg'
        );
    }
}
