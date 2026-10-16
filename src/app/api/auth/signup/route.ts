import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, firstName, lastName, sport, extra } = body;

    if (!email || !password || !firstName || !lastName || !sport) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // Create user via admin API — bypasses email confirmation
    const { data: authData, error: authError } =
      await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { first_name: firstName, last_name: lastName, sport },
      });

    if (authError) {
      return NextResponse.json(
        { error: authError.message },
        { status: 400 }
      );
    }

    if (!authData.user) {
      return NextResponse.json(
        { error: "Failed to create user" },
        { status: 500 }
      );
    }

    // Build profile data
    const profileData: Record<string, any> = {
      id: authData.user.id,
      first_name: firstName,
      last_name: lastName,
      email,
      sport,
    };

    if (extra && typeof extra === "object") {
      Object.entries(extra).forEach(([key, value]) => {
        if (value !== undefined && value !== "" && value !== null) {
          profileData[key] = value;
        }
      });
    }

    // Insert profile
    const { error: profileError } = await supabaseAdmin
      .from("cc_profiles")
      .insert(profileData);

    if (profileError) {
      // Profile insert failed — clean up the auth user
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
      return NextResponse.json(
        { error: `Profile creation failed: ${profileError.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      userId: authData.user.id,
      email: authData.user.email,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
