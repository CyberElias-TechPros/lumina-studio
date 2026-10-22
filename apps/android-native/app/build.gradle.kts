plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
    id("org.jetbrains.kotlin.plugin.compose")
    id("org.jetbrains.kotlin.plugin.serialization")
}
android {
    namespace = "ng.cea.nativeapp"
    compileSdk = 35

    val releaseKeystorePath = System.getenv("CEA_KEYSTORE_PATH")?.trim()?.takeIf { it.isNotEmpty() }
    val releaseKeystorePassword = System.getenv("CEA_KEYSTORE_PASSWORD")?.takeIf { it.isNotEmpty() }
    val releaseKeyAlias = System.getenv("CEA_KEY_ALIAS")?.trim()?.takeIf { it.isNotEmpty() }
    val releaseKeyPassword = System.getenv("CEA_KEY_PASSWORD")?.takeIf { it.isNotEmpty() }
    val hasReleaseSigning =
        releaseKeystorePath != null &&
            releaseKeystorePassword != null &&
            releaseKeyAlias != null &&
            releaseKeyPassword != null

    defaultConfig {
        applicationId = System.getenv("CEA_APPLICATION_ID")?.trim()?.takeIf { it.isNotEmpty() }
            ?: "ng.cea.app.nativepreview"
        minSdk = 23
        targetSdk = 35
        versionCode = System.getenv("CEA_VERSION_CODE")?.trim()?.toIntOrNull() ?: 6
        versionName = System.getenv("CEA_VERSION_NAME")?.trim()?.takeIf { it.isNotEmpty() }
            ?: "0.6.0-native-preview"
        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }
    signingConfigs {
        if (hasReleaseSigning) {
            create("release") {
                storeFile = file(releaseKeystorePath!!)
                storePassword = releaseKeystorePassword
                keyAlias = releaseKeyAlias
                keyPassword = releaseKeyPassword
            }
        }
    }
    buildTypes {
        getByName("release") {
            isMinifyEnabled = false
            if (hasReleaseSigning) {
                signingConfig = signingConfigs.getByName("release")
            }
        }
    }
    buildFeatures { compose = true }
    compileOptions { sourceCompatibility = JavaVersion.VERSION_17; targetCompatibility = JavaVersion.VERSION_17 }
    kotlinOptions { jvmTarget = "17" }
    packaging { resources.excludes += "/META-INF/{AL2.0,LGPL2.1}" }
}
dependencies {
    val composeBom = platform("androidx.compose:compose-bom:2024.12.01")
    implementation(composeBom)
    androidTestImplementation(composeBom)
    implementation("androidx.activity:activity-compose:1.9.3")
    implementation("androidx.lifecycle:lifecycle-viewmodel-compose:2.8.7")
    implementation("androidx.lifecycle:lifecycle-runtime-compose:2.8.7")
    implementation("androidx.compose.material3:material3")
    implementation("androidx.compose.material:material-icons-core")
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-android:1.9.0")
    implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.7.3")
    testImplementation("junit:junit:4.13.2")
    androidTestImplementation("androidx.test.ext:junit:1.2.1")
    androidTestImplementation("androidx.test:runner:1.6.2")
    androidTestImplementation("androidx.compose.ui:ui-test-junit4")
    debugImplementation("androidx.compose.ui:ui-test-manifest")
}

val verifyPublicLessons by tasks.registering {
    doLast {
        check(file("src/main/assets/public-lessons/lessons.json").isFile) {
            "Missing public lessons. Run npm ci and node apps/android-native/scripts/build-lessons.mjs from the repository root."
        }
    }
}
tasks.named("preBuild") { dependsOn(verifyPublicLessons) }
