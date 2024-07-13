import { getResponses, updateResponse } from "../../../data/responses";
import { App } from "../../../server";
import { Steps } from "../components/layout";

export const updateInfoUrl = "/actions/update-info";

export function registerStartAssessment(app: App) {
  app.post(updateInfoUrl, async (c) => {
    const formData = await c.req.formData();
    const firstname = formData.get("firstname") as string;
    const lastname = formData.get("lastname") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;

    const responses = getResponses(c);
    responses.info.firstname = firstname;
    responses.info.lastname = lastname;
    responses.info.email = email;
    responses.info.phone = phone;
    updateResponse(c, responses);

    return c.redirect("/assessment/context");
  });

  app.get("/assessment/start", async (c) => {
    const responses = getResponses(c);

    return c.render(
      <div className="container mx-auto max-w-xl">
        <div class="space-y-8">
          <Steps current={0} />

          <h1 class="text-4xl">Let's Go</h1>

          <p>
            Hey there! Let's get a little info about you so we know where to
            send your report.
          </p>

          <div className="max-w-xl">
            <form class="space-y-8" method="POST" action={updateInfoUrl}>
              <div>
                <span>1. What's your name?*</span>
                <div className="flex gap-8">
                  <div class="w-full">
                    <label class="label" for="firstname">
                      First
                    </label>
                    <input
                      type="text"
                      name="firstname"
                      id="firstname"
                      required
                      value={responses?.info?.firstname}
                      class="input input-bordered w-full"
                    />
                  </div>
                  <div class="w-full">
                    <label class="label" for="lastname">
                      First
                    </label>
                    <input
                      type="text"
                      name="lastname"
                      id="lastname"
                      required
                      value={responses?.info?.lastname}
                      class="input input-bordered w-full"
                    />
                  </div>
                </div>
              </div>

              <div>
                <span>2. What's your email?*</span>
                <div>
                  <label class="label" for="email">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    name="email"
                    id="email"
                    value={responses?.info?.email}
                    class="input input-bordered w-full"
                  />
                </div>
              </div>

              <div>
                <span>3. What's the best phone number to reach you at?</span>
                <div>
                  <label class="label" for="phone">
                    Phone number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={responses?.info?.phone}
                    class="input input-bordered w-full"
                  />
                </div>
              </div>

              <div class={"flex justify-center"}>
                <button class="btn btn-outline">Next</button>
              </div>
            </form>
          </div>
        </div>
      </div>,
      {
        title: "Podcast Assessment - Start",
      },
    );
  });
}
